import { NextResponse } from "next/server";
import { buildTrafic } from "@/lib/aggregate";

// Le bot s'execute a chaque requete ; le CDN met la reponse en cache 60 s.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await buildTrafic();
    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Le bot n'a pas pu collecter l'info-trafic." },
      { status: 500 },
    );
  }
}
