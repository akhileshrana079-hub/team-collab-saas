const Workspace = require('../models/Workspace');
const WorkspaceMember = require('../models/WorkspaceMember');

const checkWorkspacePermission = async (workspaceId,userId,allowedRoles) => {

  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    return {
      success: false,
      status: 404,
      message: "Workspace not found",
    };
  }

  const membership = await WorkspaceMember.findOne({
    workspace: workspaceId,
    user: userId,
  });

  if (!membership) {
    return {
      success: false,
      status: 403,
      message: "You are not a member of this workspace",
    };
  }

  if (!allowedRoles.includes(membership.role)) {
    return {
      success: false,
      status: 403,
      message: "You don't have permission to perform this action",
    };
  }

  return {
    success: true,
    workspace,
    membership,
  };
};

module.exports = checkWorkspacePermission;