import { useContext, useEffect, useState } from "react";
import { Button, Tooltip, Whisper } from "rsuite";
import { useAuth } from "../hooks/useAuth";
import { Uploader, Message, Loader, useToaster } from 'rsuite';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import { useTheme } from "../hooks/useTheme";

interface Props {
  url_image?: string | undefined;
  name: string;
  email: string;
  role?: string;
}

const CardUser = ({ url_image, name, email, role }: Props) => {
  const [loading, setLoading] = useState(false)
  const { signOut, token } = useAuth();
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const { theme } = useTheme()

  const handleClick = () => {
    setLoading(true)
    signOut()
    setLoading(false)
  }

  const previewFile = (file: any, callback: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div
      style={{
        padding: 20,
        width: 300,
        height: "auto",
        backgroundColor: theme === "light" ? "whitesmoke" : "#3e3e42",
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: "12%",
      }}
    >
      {url_image ? (
        <img
          src={url_image}
          width="150"
          height="150"
          style={{
            borderRadius: "50%",
            marginBottom: 20,
            border: theme === "light" ? "4px solid #fff" : "4px solid #252526",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      ) : (
          <Uploader
            fileListVisible={false}
            listType="picture"
            action={`${import.meta.env.VITE_BASE_URL}/users/picture`}
            headers={{ Authorization: token }}
            method={"POST"}
            name="file"
            onUpload={file => {
              setUploading(true)
              previewFile(file.blobFile, (value: any) => {
                setFileInfo(value);
              });
            }}
            onSuccess={(response) => {
              setUploading(false);
              toaster.push(<Message type="success" color="green">{response.message}</Message>);
            }}
            onError={() => {
              setFileInfo(null);
              setUploading(false);
              toaster.push(<Message type="error" color="red">Erro ao realizar o upload da foto!</Message>);
            }}
            >
            <button style={{ width: 150, height: 150, borderRadius: 75 }}>
              {uploading && <Loader backdrop center />}
              {fileInfo ? (
                <img src={fileInfo} width="100%" height="100%" />
              ) : (
                <Whisper followCursor speaker={<Tooltip>Clique para adicionar uma foto</Tooltip>}>
                  <AvatarIcon style={{ fontSize: 80 }} />
                </Whisper>
              )}
            </button>
          </Uploader>
      )}
      <div style={{ textAlign: "left" }}>
        <h6 style={{ margin: 0, marginBottom: 5, marginTop: 10 }}>Nome: {name}</h6>
        <h6 style={{ margin: 0, marginBottom: 5 }}>E-mail: {email}</h6>
        <h6 style={{ margin: 0, marginBottom: 30 }}>Função: {role}</h6>
        <Button
          appearance="primary"
          color="red"
          size="md"
          style={{ width: "60px", textAlign: "center"}}
          loading={loading}
          onClick={handleClick}
        >
        SAIR
        </Button>
      </div>
      
    </div>
  );
};

export default CardUser;
