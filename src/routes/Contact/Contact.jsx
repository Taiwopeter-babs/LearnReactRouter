import { Form, useLoaderData, useFetcher } from "react-router-dom";
import styles from './Contact.module.css';
import { useEffect, useState } from "react";


export default function Contact() {
  const { contact } = useLoaderData();

  async function handleDestroy(e) {
    // throw new Error('Error in deletion');
    if (!confirm('Do you want to delete this record?')) {
      e.preventDefault();
    }

  }

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              rel="noreferrer" // for older browsers
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={handleDestroy}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  // yes, this is a `let` for later
  const fetcher = useFetcher();
  let favorite = contact.favorite;

  const [isActive, setIsActive] = useState(false);


  const handleToggle = () => {
    setIsActive(!isActive);
  }

  const stylesLike = {
    'background-position': favorite ? 'right' : 'left'
  }

  return (
    <fetcher.Form method="post">
      <button
        style={stylesLike} className={`${styles.heart} ${isActive ? styles.is_animating : null}`} onClick={handleToggle}
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {/* {favorite ? "★" : "☆"} */}
      </button>
      {/* <div style={stylesLike} className={`${styles.heart} ${isActive ? styles.is_animating : null}`} onClick={handleToggle}></div> */}
    </fetcher.Form >
  );
}