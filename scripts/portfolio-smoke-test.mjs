import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const read = (path) => readFileSync(join(root, path), "utf8");
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

const data = read("lib/data.ts");
const projects = read("components/Projects.tsx");
const modal = read("components/ProjectModal.tsx");
const contact = read("components/Contact.tsx");
const page = read("app/page.tsx");
const globals = read("app/globals.css");

assert(!data.includes("picsum.photos"), "lib/data.ts ne doit plus utiliser picsum.photos.");
assert(!data.includes("const IMG"), "lib/data.ts ne doit plus générer d'images aléatoires.");
assert(
  data.includes('live: "https://huntzenjobs.com"'),
  "HuntZenJobs doit pointer vers https://huntzenjobs.com.",
);
assert(
  !data.includes("https://jobs.huntzen.co"),
  "L'ancienne URL HuntZen jobs.huntzen.co doit disparaître.",
);
assert(
  /imageAlt\??: string/.test(data) || /imageAlt: string/.test(data),
  "Le type Project doit exposer un texte alternatif précis via imageAlt.",
);
assert(
  !/image:\s*IMG\(/.test(data) && !/image:\s*"https?:\/\//.test(data),
  "Chaque projet doit référencer une image locale authentique.",
);

const imageMatches = [...data.matchAll(/image:\s*"\/projects\/([^"]+)"/g)];
assert(imageMatches.length >= 5, "Les projets affichés doivent référencer cinq captures dans /projects.");
for (const [, filename] of imageMatches) {
  assert(
    existsSync(join(root, "public", "projects", filename)),
    `Capture manquante: public/projects/${filename}`,
  );
}

assert(!projects.includes('role="button"'), "Les cartes projets ne doivent pas utiliser article role=\"button\".");
assert(!projects.includes("<motion.img"), "Les cartes projets doivent utiliser next/image.");
assert(!modal.includes("<img"), "La modale projet doit utiliser next/image.");
assert(!contact.includes("Message envoyé"), "Le formulaire mailto ne doit pas annoncer un envoi non vérifiable.");
assert(!page.includes("2200"), "La page ne doit plus bloquer l'affichage avec un loader de 2,2 s.");
assert(
  globals.includes("@media (prefers-reduced-motion: reduce)"),
  "globals.css doit définir un comportement prefers-reduced-motion.",
);

if (failures.length > 0) {
  console.error(`Portfolio smoke test: ${failures.length} échec(s)`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Portfolio smoke test: OK");
