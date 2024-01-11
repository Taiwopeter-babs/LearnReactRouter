import { createContact, getContact, deleteContact, updateContact } from "./contact";
import { redirect } from "react-router-dom";

export async function rootAction() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function deleteAction({ params }) {
  await deleteContact(params.contactId);
  return redirect('/');
}

export async function contactLoader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}

export async function contactAction({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}