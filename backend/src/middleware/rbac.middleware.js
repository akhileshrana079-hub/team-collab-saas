const WorkspaceMember = require("../models/WorkspaceMember");

const authorizeWorkspace = (...roles) => {
  return async (req, res, next) => {
    try {
      const workspaceId = req.params.id;

      const membership = await WorkspaceMember.findOne({
        workspace: workspaceId,
        user: req.user._id,
      });

      if (!membership) {
        return res.status(403).json({
          success: false,
          message: "You are not a member of this workspace",
        });
      }

      if (!roles.includes(membership.role)) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to perform this action",
        });
      }

      req.membership = membership;

      next();

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};

module.exports = authorizeWorkspace;