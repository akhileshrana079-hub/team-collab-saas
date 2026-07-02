const mongoose = require('mongoose');
const Workspace = require('../models/Workspace');
const WorkspaceMember = require('../models/WorkspaceMember');

exports.createWorkspace = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { name, description } = req.body;

    if (!name) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        success: false,
        message: "Workspace name is required",
      });
    }

    const workspace = await Workspace.create(
      [
        {
          name,
          description,
          owner: req.user._id,
        },
      ],
      { session }
    );

    await WorkspaceMember.create(
      [
        {
          workspace: workspace[0]._id,
          user: req.user._id,
          role: "OWNER",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      workspace: workspace[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


exports.getMyWorkspace = async (req, res) => {
  try {
    const memberships = await WorkspaceMember.find({
      user: req.user._id,
    })
      .populate({
        path: "workspace",
        select: "name description owner createdAt updatedAt",
      })
      .sort({ createdAt: -1 });

    const workspaces = memberships.map((membership) => ({
      role: membership.role,
      workspace: membership.workspace,
    }));

    return res.status(200).json({
      success: true,
      count: workspaces.length,
      workspaces,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getWorkspace = async (req, res) => {
  try {
    const { id } = req.params;

    const workspace = await Workspace.findById(id).populate(
      "owner",
      "name email avatar"
    );

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

    return res.status(200).json({
      success: true,
      message: "Workspace fetched successfully",
      data: {
        workspace,
        role: membership.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


exports.updateWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

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

    if (!["OWNER", "ADMIN"].includes(membership.role)) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to update this workspace",
      });
    }

    if (name) workspace.name = name;
    if (description !== undefined) workspace.description = description;

    await workspace.save();

    return res.status(200).json({
      success: true,
      message: "Workspace updated successfully",
      data: workspace,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.deleteWorkspace = async(req,res)=>{
    res.send('Delete Workspace');
};

