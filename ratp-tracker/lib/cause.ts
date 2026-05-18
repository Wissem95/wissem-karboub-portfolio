/**
 * Deduit une cause normalisee a partir d'un texte de perturbation.
 * Renvoie une chaine vide si rien n'est reconnu.
 */
export function inferCause(text: string): string {
  const s = text.toLowerCase();
  if (/gr[eè]ve|mouvement social/.test(s)) return "Mouvement social";
  if (/colis|bagage abandonn|sac abandonn/.test(s)) return "Colis suspect";
  if (/malaise|voyageur malade|accident (de |grave de )?voyageur|incident voyageur/.test(s))
    return "Incident voyageur";
  if (/intemp[eé]rie|m[eé]t[eé]o|neige|verglas|inondation|canicule|orage/.test(s))
    return "Intemperies";
  if (/travaux|modernisation|chantier/.test(s)) return "Travaux";
  if (/signalisation/.test(s)) return "Panne de signalisation";
  if (/[eé]lectrique|alimentation|cat[eé]naire/.test(s)) return "Incident d'alimentation";
  if (/panne|incident technique|incident mat[eé]riel|incident d'exploitation/.test(s))
    return "Incident technique";
  if (/accident/.test(s)) return "Accident";
  if (/manifestation/.test(s)) return "Manifestation";
  if (/affluence/.test(s)) return "Forte affluence";
  if (/objet|obstacle/.test(s) && /voie/.test(s)) return "Obstacle sur les voies";
  if (/incendie|fum[eé]e/.test(s)) return "Incendie";
  return "";
}

/** Erreur lisible pour le journal du bot. */
export function errLabel(err: unknown): string {
  if (err instanceof Error) {
    if (err.name === "AbortError") return "delai depasse";
    return err.message;
  }
  return "erreur inconnue";
}
