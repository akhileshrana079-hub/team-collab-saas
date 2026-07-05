const WorkspaceMember = require("../models/WorkspaceMember");
const Workspace = require("../models/Workspace");
const Project = require("../models/Project");
const Task = require("../models/Task");

exports.getDashboard = async (req, res) => {
  try {
    const memberships = await WorkspaceMember.find({
      user: req.user._id,
    });

    const workspaceIds = memberships.map((m) => m.workspace);

    const workspaceCount = workspaceIds.length;

    const projectCount = await Project.countDocuments({
      workspace: { $in: workspaceIds },
    });

    const projectIds = await Project.find({
      workspace: { $in: workspaceIds },
    }).select("_id");

    const ids = projectIds.map((p) => p._id);

    const taskCount = await Task.countDocuments({
      project: { $in: ids },
    });

    const memberCount = memberships.length;

    res.json({
      success: true,
      data: {
        workspaces: workspaceCount,
        projects: projectCount,
        tasks: taskCount,
        members: memberCount,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};