"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  revalidatePath("/");
  redirect("/");
}

export const createSnippet = async (
  formState: { message: string },
  formData: FormData
) => {
  try {
    // check the user's input and make sure they'are valid inputs
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    if (typeof title !== "string" || title.length < 3) {
      return { message: "Title must be longer" };
    }
    if (typeof code !== "string" || code.length < 10) {
      return { message: "Code must be longer" };
    }
    // Create a new record in the database
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    // throw new Error("opps");
    // Redirect the user back to the root route
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: "Something went wrong" };
    }
  }
  revalidatePath("/");
  redirect("/");
};
