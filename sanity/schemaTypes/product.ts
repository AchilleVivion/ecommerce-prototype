import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "internationalizedArrayString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.0.value", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "internationalizedArrayText",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "discountedPrice",
      title: "Discounted price",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "discount",
      title: "Discount (%)",
      type: "number",
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (rule) => rule.required().min(0).max(5),
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageUrl",
      title: "Image URL (external)",
      type: "url",
      description: "Fallback external image URL when no Sanity asset is uploaded.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
    prepare({ title, media }) {
      const enTitle =
        Array.isArray(title) &&
        title.find((item: { language?: string }) => item.language === "en");
      return {
        title: enTitle?.value ?? "Untitled product",
        media,
      };
    },
  },
});
