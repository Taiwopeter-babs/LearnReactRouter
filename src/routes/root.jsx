import { Outlet, Form, NavLink, useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getContacts } from "../contact";

export default function Root() {

    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        let mounted = true;
        const fetchContacts = async () => {
            const allContacts = await getContacts(search);
            if (mounted) {
                setContacts(allContacts);
            }
        }
        fetchContacts();
        return () => mounted = false;
    }, [contacts, search]);

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "q"
        );

    // contacts list to render
    const contactsList = contacts.map((contact) => {
        return (
            <li key={contact.id}>
                <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                        isActive
                            ? "active"
                            : isPending
                                ? "pending"
                                : ""
                    }
                >
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                </NavLink>
            </li>
        )
    });


    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <Form role="search" id="search-form">
                        <input
                            type="search" id="q"
                            className={searching ? "loading" : ""}
                            aria-label="Search Contacts" placeholder="Search"
                            name="q" value={search} onChange={(e) => setSearch(e.target.value)}
                        />
                        <div id="search-spinner" aria-hidden hidden={!searching} />
                        <div className="sr-only" aria-live="polite"></div>
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contactsList}
                        </ul>
                    ) : (
                        <p>
                            <i>No Contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail" className={
                navigation.state === "loading" ? "loading" : ""
            }>
                <Outlet />
            </div>
        </>
    )
}