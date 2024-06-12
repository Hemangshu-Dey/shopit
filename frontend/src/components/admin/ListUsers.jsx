import React, { useEffect } from 'react'
import Loader from "../layout/Loader";
import toast from 'react-hot-toast';
import {MDBDataTable} from "mdbreact";
import { Link} from 'react-router-dom';
import MetaData from '../layout/MetaData';
import AdminLayout from '../layout/AdminLayout';
import { useDeleteUserMutation, useGetAdminUsersQuery } from '../../redux/api/userApi';

const ListUsers = () => {

    const {data, isLoading, error } = useGetAdminUsersQuery()

    const [deleteUser, {error: deleteError, isLoading: isDeleteLoading, isSuccess}] = useDeleteUserMutation()

    

    useEffect(() =>{
          if (error) {
              toast.error(error?.data?.message);
          }

          if (deleteError) {
            toast.error(deleteError?.data?.message);
        }

        if (isSuccess) {
            toast.success("User Deleted");
        }
      }, [error,deleteError,isSuccess]);

      const deleteUserHandler = (id) =>{
        deleteUser(id);
    }


      const setUsers = () => {
        const users = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc"
                },
                {
                    label: "Name",
                    field: "name",
                    sort: "asc"
                },
                {
                    label: "Email",
                    field: "email",
                    sort: "asc"
                },
                {
                    label: "Role",
                    field: "role",
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: "actions",
                    sort: "asc"
                }
            ],
            rows: []
        }

        data?.user?.forEach((user1) => {
            users.rows.push({
                id: user1?._id,
                name: user1?.name,
                email: user1?.email,
                role: user1?.role,
                actions: (
                    <>
                    <Link to={`/admin/users/${user1?._id}`} className="btn btn-outline-primary">
                    <i className="fa fa-pencil"></i>
                    </Link>
                    <button 
                    className="btn btn-outline-danger ms-2" 
                    onClick={() => deleteUserHandler(user1?._id)}
                    disabled={isDeleteLoading}
                    >
                    <i className="fa fa-trash"></i>
                    </button>
                    </>
                )
            })
        })

        return users;
      }

      if (isLoading) { return <Loader/> }

  return (
    
    
    <AdminLayout>
        <MetaData title={"All Users"}/>
        <h1 className="my-5">{data?.user?.length} Users</h1>
    <MDBDataTable 
    data={setUsers()}
    className="px-3"
    bordered
    striped
    hover
    />
    </AdminLayout>
  )
}

export default ListUsers