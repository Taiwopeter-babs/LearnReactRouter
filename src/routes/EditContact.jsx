import { Form, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { updateContact } from "../contact";

export default function EditContact() {
    const { contactId } = useParams();
    const navigate = useNavigate();

    const { contact } = useLoaderData();
    const { first, last, twitter, notes } = contact;

    const [firstName, setFirstName] = useState(first);
    const [lastName, setLastName] = useState(last);
    const [social, setSocial] = useState(twitter);
    const [userNotes, setUserNotes] = useState(notes);


    async function handleSubmit(e) {
        e.preventDefault();
        const updates = {
            first: firstName, last: lastName,
            twitter: social,
            notes: userNotes
        }
        await updateContact(contactId, updates);
        navigate(`..`, { relative: 'path' });
    }


    return (
        <Form method="post" id="contact-form" onSubmit={handleSubmit}>
            <p>
                <span>Name</span>
                <input
                    placeholder="First" aria-label="First Name"
                    type="text" name="First"
                    defaultValue={contact.first}
                    onChange={e => { setFirstName(e.target.value) }}
                />

                <input
                    placeholder="Last" aria-label="Last Name"
                    type="text" name="Last"
                    defaultValue={contact.last}
                    onChange={e => { setLastName(e.target.value) }}
                />
            </p>

            <label>
                <span>Twitter</span>
                <input
                    placeholder="@jack"
                    type="text" name="twitter"
                    defaultValue={contact.twitter}
                    onChange={e => { setSocial(e.target.value) }}
                />
            </label>

            <label>
                <span>Avatar URL</span>
                <input
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                    type="text"
                    name="avatar"
                    defaultValue={contact.avatar}
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea
                    name="notes"
                    defaultValue={contact.notes}
                    onChange={e => { setUserNotes(e.target.value) }}
                    rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button" onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }
                }>Cancel</button>
            </p>
        </Form >
    )
}