import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import toast from "react-hot-toast";

import {
  getMembers,
  addMember,
  updateMemberRole,
  removeMember,
} from "../../services/member.service";

function Member() {
  const { workspaceId } = useParams();

  const [members, setMembers] = useState([]);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MEMBER");

  const loadMembers = async () => {
    try {
      const response = await getMembers(workspaceId);

      setMembers(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load members");
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleAdd = async () => {
    if (!email.trim()) {
      return toast.error("Email is required");
    }

    try {
      await addMember(workspaceId, {
        email,
        role,
      });

      toast.success("Member added");

      setEmail("");
      setRole("MEMBER");

      loadMembers();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add member"
      );
    }
  };

  const handleRole = async (memberId, role) => {
    try {
      await updateMemberRole(memberId, role);

      toast.success("Role updated");

      loadMembers();
    } catch (error) {
      console.error(error);

      toast.error("Failed to update role");
    }
  };

  const handleRemove = async (memberId) => {
    try {
      await removeMember(memberId);

      toast.success("Member removed");

      loadMembers();
    } catch (error) {
      console.error(error);

      toast.error("Failed to remove member");
    }
  };

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Members
        </h1>

        <div className="flex gap-3">

          <input
            className="border rounded-lg p-3"
            placeholder="Member Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <select
            className="border rounded-lg p-3"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >
            <option value="ADMIN">ADMIN</option>
            <option value="MANAGER">MANAGER</option>
            <option value="MEMBER">MEMBER</option>
          </select>

          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-6 rounded-lg"
          >
            Add
          </button>

        </div>

      </div>
            {members.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <h2 className="text-xl font-semibold">
            No Members Found
          </h2>

          <p className="text-gray-500 mt-2">
            Invite your first team member.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {members.map((member) => (

            <div
              key={member._id}
              className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition"
            >

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  {member.user.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2 className="text-lg font-bold">
                    {member.user.name}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {member.user.email}
                  </p>
                </div>

              </div>

              <div className="mt-5">

                <label className="font-semibold">
                  Role
                </label>

                <select
                  className="w-full border rounded-lg p-2 mt-2"
                  value={member.role}
                  onChange={(e) =>
                    handleRole(member._id, e.target.value)
                  }
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="MEMBER">MEMBER</option>
                </select>

              </div>

              <button
                onClick={() => handleRemove(member._id)}
                className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              >
                Remove Member
              </button>

            </div>

          ))}

        </div>
      )}

    </DashboardLayout>
  );
}

export default Member;