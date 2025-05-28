import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; 

export default function Admin() {
  const navigate = useNavigate();

  const handleAudit = () => {
    navigate("/admin/audit");
  };

  const handleTool = () => {
    navigate("/admin/tools")
  }

  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">管理员后台</h1>
      <Button className="mb-4" onClick={handleAudit}>
        投稿审核
      </Button>
      <Button className="mb-4" onClick={handleTool}>
        工具管理
      </Button>
      
    </div>
    <div>
    <p>
      <Link to="/" className="text-blue-500">回到主页</Link>
    </p>
    </div>
    </>
  );
}