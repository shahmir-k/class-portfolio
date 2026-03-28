import { supabaseAdmin } from "@/lib/supabase/server";

export async function generateThumbnail(url: string, projectId: string): Promise<string | null> {
  try {
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status !== "success" || !data.data?.screenshot?.url) {
      return null;
    }

    const imageResponse = await fetch(data.data.screenshot.url);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    const storagePath = `projects/${projectId}/thumbnail.png`;
    const { error } = await supabaseAdmin.storage
      .from("portfolio-assets")
      .upload(storagePath, imageBuffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (error) return null;

    const { data: urlData } = supabaseAdmin.storage
      .from("portfolio-assets")
      .getPublicUrl(storagePath);

    await supabaseAdmin
      .from("projects")
      .update({ thumbnail_url: urlData.publicUrl })
      .eq("id", projectId);

    return urlData.publicUrl;
  } catch {
    return null;
  }
}
