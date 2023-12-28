import { useState } from "react";
import { Button, Input, Pagination, Table as TableRSuite } from "rsuite";
import IUser from "../../interfaces/IUser";
import EditIcon from "@rsuite/icons/Edit";
import DeleteIcon from "@rsuite/icons/CloseOutline";
import dayjs from "dayjs";
import DeleteModal from "../modal/deleteModal/DeleteModal";
import { MaskCPF } from "../../utils/MaskCPF";
import { MaskTelephone } from "../../utils/MaskTelephone";
import UpdateModal from "../modal/updateModal/UpdateModal";
import styles from "../modal/Modal.module.css";

const { Column, HeaderCell, Cell } = TableRSuite;

interface Props {
  data: IUser[];
}

const Table = ({ data }: Props) => {
  const [limit, setLimit] = useState<number>(8);
  const [page, setPage] = useState<number>(1);

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const handleClose = () => setOpenDeleteModal(false);
  const handleOpen = () => setOpenDeleteModal(true);

  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)
  const handleCloseUpdate = () => setOpenUpdateModal(false);
  const handleOpenUpdate = () => setOpenUpdateModal(true);

  const [updateUser, setUpdateUser] = useState({
    id: "",
    name: "",
    cpf: "",
    telephone: "",
    email: ""
  })

  const [user, setUser] = useState({
    name: "",
    id: "",
  })

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setUpdateUser({
      ...updateUser,
      [name]: value,
    });
  };

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  const dataFilter = data.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  const handleDelete = (name: string, id: string) => {
    setUser({
      name: name,
      id: id
    })
    handleOpen()
  }

  const handleUpdate = (rowData: any) => {
    setUpdateUser({
      id: rowData.id,
      name: rowData.name,
      cpf: rowData.cpf,
      telephone: rowData.telephone,
      email: rowData.email
    })

    handleOpenUpdate()
  }

  return (
    <div>
      <TableRSuite height={420} data={dataFilter}>
        <Column width={200} fixed>
          <HeaderCell>Nome</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={150}>
          <HeaderCell>CPF</HeaderCell>
          <Cell>
            {(rowData: IUser | any) => <span>{MaskCPF(rowData.cpf)}</span>}
          </Cell>
        </Column>

        <Column width={100} flexGrow={1}>
          <HeaderCell>Telefone</HeaderCell>
          <Cell>
            {(rowData: IUser | any) => (
              <span>{MaskTelephone(rowData.telephone)}</span>
            )}
          </Cell>
        </Column>

        <Column width={100} flexGrow={1}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>
        <Column width={100} flexGrow={1} align="center">
          <HeaderCell>Data de Criação</HeaderCell>
          <Cell>
            {(rowData: IUser | any) => (
              <span>
                {dayjs(rowData.created_at).format("DD/MM/YYYY HH:mm")}
              </span>
            )}
          </Cell>
        </Column>
        <Column width={100} align="center">
          <HeaderCell>#</HeaderCell>
          <Cell>
            {(rowData: IUser | any) => (
              <div style={{ display: "flex", gap: 20, cursor: "pointer" }}>
                <EditIcon
                  color="black"
                  height={24}
                  title="Editar"
                  onClick={() => handleUpdate(rowData)}
                />
                <DeleteIcon
                  color="black"
                  height={24}
                  title="Deletar"
                  onClick={() => handleDelete(rowData.name, rowData.id)}
                />
              </div>
            )}
          </Cell>
        </Column>
      </TableRSuite>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          total={data.length}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>

      {openDeleteModal && (
        <DeleteModal
          id={user.id}
          name={user.name}
          open={openDeleteModal}
          handleClose={handleClose}
          handleOpen={handleOpen}
          table={"users"}
        />
      )}

      {openUpdateModal && (
        <UpdateModal
          data={updateUser}
          table="users"
          handleClose={handleCloseUpdate}
          open={openUpdateModal}
        >
          <div>
            <Input
              name="name"
              value={updateUser.name}
              className={styles.input}
              type="text"
              placeholder="Nome completo"
              onChange={(
                value: string,
                event: React.ChangeEvent<HTMLInputElement>
              ) => handleChange({ name: event.target.name, value })}
            />
            <Input
              name="cpf"
              value={MaskCPF(updateUser.cpf)}
              type="text"
              className={styles.input}
              placeholder="CPF"
              onChange={(
                value: string,
                event: React.ChangeEvent<HTMLInputElement>
              ) => handleChange({ name: event.target.name, value })}
            />
            <Input
              name="telephone"
              value={MaskTelephone(updateUser.telephone)}
              type="text"
              placeholder="Telefone"
              className={styles.input}
              onChange={(
                value: string,
                event: React.ChangeEvent<HTMLInputElement>
              ) => handleChange({ name: event.target.name, value })}
            />
            <Input
              name="email"
              value={updateUser.email}
              type="email"
              placeholder="Email"
              className={styles.input}
              onChange={(
                value: string,
                event: React.ChangeEvent<HTMLInputElement>
              ) => handleChange({ name: event.target.name, value })}
            />
          </div>
        </UpdateModal>
      )}
    </div>
  );
};

export default Table;
