import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from '../../../layout/AdminLayout';
import CustomTable from '../../../components/table/CustomTable';
import { useAuth } from "../../../contexts/AuthContext";
export default function List() {
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!userInfo?.admin) {
            navigate("/admin");
        }
    }, [])
    return (
        <Layout title="New users">
            <CustomTable />
        </Layout>
    );
}
