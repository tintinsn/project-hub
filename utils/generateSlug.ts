import slugify from "slugify";

export function generateSlug(name: string, id: string): string {
  const baseSlug = slugify(name, {
    lower: true,
    strict: true,
    replacement: "-",
  });
  return `${baseSlug}-${id.slice(-6)}`; // ใช้ 6 ตัวสุดท้ายของ ID
}
