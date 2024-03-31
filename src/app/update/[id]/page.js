"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    fetch("http://localhost:9999/topics/" + params.id)
      .then((resp) => resp.json())
      .then((result) => {
        setTitle(result.title);
        setBody(result.body);
        console.log(result);
      });
  }, []);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const body = e.target.body.value;
          const options = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, body }),
          };
          fetch(`http://localhost:9999/topics/` + params.id, options)
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              const lastid = result.id;
              router.refresh();
              router.push(`/read/${lastid}`);
            });
        }}
      >
        <p>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name="title"
            placeholder="title"
          />
        </p>
        <p>
          <textarea
            name="body"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            placeholder="dody"
          ></textarea>
        </p>
        <p>
          <input type="submit" value="update" />
        </p>
      </form>
    </>
  );
}
