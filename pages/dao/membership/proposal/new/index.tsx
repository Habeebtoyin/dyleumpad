import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import styles from "../../../../../styles/DAO.module.css";
import backArrow from "../../../../../components/assets/icons/arrow-back.svg";
import axios from "axios";
import Image from "next/image";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import { GlobalAuth } from "../../../../../context/GlobalContext";
import { useSigner } from "wagmi";
import { verifyMessage } from "ethers/lib/utils.js";

type CreateUserResponse = {
  title: string;
  description: string;
  creator: string;
};

export default function NewProposal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data: signer, isError, isLoading } = useSigner();

  const {setIsOpen,
    modalIsOpen}= GlobalAuth();
  let subtitle: any;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#00ff6a';
  }

  function closeModal() {
    setIsOpen(false);
  }
  // const address = useAddress()
  // const notify = (err: string) => {
  //   toast.success(err, {
  //     position: "top-right",
  //     autoClose: 10000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //   });
  // };

  async function createProposal(e: any) {
    const Message = title + " " + description;
    const createProposalSig= await signer?.signMessage(Message)
   
    console.log(await createProposal)
    console.log("clicked");
    e.preventDefault();
    e.stopPropagation();
    try {
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      };
      const address=verifyMessage(Message, createProposalSig as any)
      let bodyContent = JSON.stringify({
        title: title,
        description: description,
        creator:address,
      });

      let response = await fetch(
        "https://solimax-nest-api-danijel-enoch.vercel.app/api/proposals/create",
        {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        }
      );

      let data = await response.json();
      if (data) {
        openModal();
        toast.success("Proposal was submitted successfully");
        setTitle("");
        setDescription("");
      }
    } catch (err: any) {
      console.log(err.message);
      if (err) {
        toast.error(err.message);
      }
    }

    // try {
    //   // 👇️ const data: CreateUserResponse
    //   const { data, status } = await axios.post<CreateUserResponse>(
    //     "https://solimax-nest-api-danijel-enoch.vercel.app/api/proposals/create",
    //     { title: title, description: description },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //       },
    //     }
    //   );
    //   console.log(JSON.stringify(data, null, 4));

    //   console.log(status);
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     console.log("error message: ", error.message);
    //     // 👇️ error: AxiosError<any, any>
    //     return error.message;
    //   } else {
    //     console.log("unexpected error: ", error);
    //     return "An unexpected error occurred";
    //   }
    // }
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
        <title>Solimax DAO | New Proposal</title>
        <meta
          name="description"
          content="A Secure Multi-chain Launch-pad with High Staking"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-icon.svg" />
      </Head>
      <section className={`${styles.newProposalPage} ${styles.heroSection}`}>
      {/* <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            className="modal"
            contentLabel="Example Modal"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Success</h2>
            <button className="closeBtn" onClick={closeModal}>
              close
            </button>
            <div>
            Proposal was submitted successfully
            </div>
          </Modal> */}
        <div className={` ${styles.heroContainer}`}>
          

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
                value={title}
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
                rows={20}
                cols={20}
                value={description}
                style={{
                  color: "#fff",
                  width: "100%",
                  background: "transparent",
                }}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                id="description"
              />
            </label>
            <button
              disabled={title === "" || description === ""}
              type="submit"
              className={styles.button}
            >
              Submit proposal
            </button>
          </form>
        </div>
      </section>
    </>
  );
}