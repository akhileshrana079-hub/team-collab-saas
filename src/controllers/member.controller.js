const User = require('../models/User');
const Workspace = require('../models/Workspace');
const WorkspaceMember = require('../models/WorkspaceMember');

exports.addMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
 
    const workspace = await Workspace.findById(id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    const currentMember = await WorkspaceMember.findOne({
      workspace: id,
      user: req.user._id,
    });

    if (!currentMember) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this workspace",
      });
    }

    if (
      !["OWNER", "ADMIN", "MANAGER"].includes(currentMember.role)
    ) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to add members",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user._id.equals(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: "You are already a member",
      });
    }

    const existingMember = await WorkspaceMember.findOne({
      workspace: id,
      user: user._id,
    });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: "User is already a member",
      });
    }

    const allowedRoles = ["ADMIN", "MANAGER", "MEMBER"];

    if (role && !allowedRoles.includes(role)) {
    return res.status(400).json({
    success: false,
    message: "Invalid role",
  });
}
    const member = await WorkspaceMember.create({
      workspace: id,
      user: user._id,
      role: role || "MEMBER",
    });

    return res.status(201).json({
      success: true,
      message: "Member added successfully",
      data: member,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


exports.getMembers = async (req, res) => {
  try {
    const { id } = req.params;

    const workspace = await Workspace.findById(id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    const membership = await WorkspaceMember.findOne({
      workspace: id,
      user: req.user._id,
    });

    if (!membership) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this workspace",
      });
    }

    const members = await WorkspaceMember.find({
      workspace: id,
    })
      .populate("user", "name email avatar")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


exports.updateMemberRole = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { role } = req.body;

    const allowedRoles = ["ADMIN", "MANAGER", "MEMBER"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const member = await WorkspaceMember.findById(memberId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const currentMember = await WorkspaceMember.findOne({
      workspace: member.workspace,
      user: req.user._id,
    });

    if (!currentMember) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this workspace",
      });
    }

    if (!["OWNER", "ADMIN"].includes(currentMember.role)) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission",
      });
    }

    if (member.user.equals(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own role",
      });
    }

    member.role = role;

    await member.save();

    return res.status(200).json({
      success: true,
      message: "Member role updated successfully",
      data: member,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


exports.removeMember = async (req, res) => {
  try {
    const { memberId } = req.params;

    const member = await WorkspaceMember.findById(memberId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const currentMember = await WorkspaceMember.findOne({
      workspace: member.workspace,
      user: req.user._id,
    });

    if (!currentMember) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this workspace",
      });
    }

    if (member.user.equals(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: "You cannot remove yourself",
      });
    }

    if (currentMember.role === "OWNER") {
      await member.deleteOne();

      return res.status(200).json({
        success: true,
        message: "Member removed successfully",
      });
    }

    if (currentMember.role === "ADMIN") {

      if (
        member.role === "OWNER" ||
        member.role === "ADMIN"
      ) {
        return res.status(403).json({
          success: false,
          message: "You cannot remove this member",
        });
      }

      await member.deleteOne();

      return res.status(200).json({
        success: true,
        message: "Member removed successfully",
      });
    }

    return res.status(403).json({
      success: false,
      message: "You don't have permission to remove members",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};