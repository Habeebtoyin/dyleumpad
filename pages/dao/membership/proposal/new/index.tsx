import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import styles from "../../../../../styles/DAO.module.css";
import axios from "axios";

type CreateUserResponse = {
  title: string;
  description: string;
  creator: string;
};

export default function NewProposal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function createProposal(e: any) {
    console.log("clicked");
    e.preventDefault();
    e.stopPropagation();
    try {
      // 👇️ const data: CreateUserResponse
      const { data, status } = await axios.post<CreateUserResponse>(
        "https://solimax-nest-api-danijel-enoch.vercel.app/api/proposals/create",
        { title: title, description: description },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(JSON.stringify(data, null, 4));

      console.log(status);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        // 👇️ error: AxiosError<any, any>
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  // const createProposal = async (e : any) => {

  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ title: title, description: description }),
  //   };

  //   const res = await fetch(
  //     "https://solimax-nest-api-danijel-enoch.vercel.app/api/proposals/create",
  //     requestOptions
  //   )
  //     const data = await res.json();
  //     console.log(data)
  // };

  return (
    <>
      <Head>
        <title>Solimax DAO | Member Page</title>
        <meta
          name="description"
          content="A Secure Multi-chain Launch-pad with High Staking"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-icon.svg" />
      </Head>
      <section className={` ${styles.heroSection}`}>
        <div className={` ${styles.heroContainer}`}>
          <div className="" style={{display: "flex"}}>

          <Link href="/dao/membership">&#x2190; Back</Link>
          </div>

          <form
            action=""
            style={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
            onSubmit={createProposal}
          >
            <label
              htmlFor="title"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              Title
              <input
                type="text"
                style={{ color: "#fff" }}
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                id="title"
                autoFocus
                required
              />
            </label>
            <label
              htmlFor="description"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              Description
              <textarea
              rows={20} cols={20}
                style={{ color: "#fff" , width: "100%", background: "transparent"}}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                id="description"
              />
            </label>
            <button
              type="submit"
              style={{
                marginTop: "20px",
                fontSize: "18px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                fontWeight: "500",
                borderRadius: "40px",
                width: "100%",
                maxWidth: "500px",
                marginInline: "auto",
                background:
                  "linear-gradient(90.72deg,rgba(107, 3, 184, 0.9) 21.79%,rgba(168, 24, 186, 0.9) 54.77%, rgba(226, 43, 187, 0.9) 85.69%)",
              }}
            >
              Submit proposal
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
