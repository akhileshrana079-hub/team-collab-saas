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

      return res.status(400).json({
        success: false,
        message: "Workspace name is required",
      });
    }

    const [workspace] = await Workspace.create(
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
          workspace: workspace._id,
          user: req.user._id,
          role: "OWNER",
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      data: workspace,
    });
  } catch (error) {
    await session.abortTransaction();

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  } finally {
    session.endSession();
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
      data: workspaces,
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
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    const { name, description } = req.body;

    if (name) workspace.name = name;

    if (description !== undefined) {
      workspace.description = description;
    }

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

exports.deleteWorkspace = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const workspace = await Workspace.findById(req.params.id).session(session);

    if (!workspace) {
      await session.abortTransaction();

      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    await WorkspaceMember.deleteMany(
      {
        workspace: workspace._id,
      },
      { session }
    );

    await Workspace.deleteOne(
      {
        _id: workspace._id,
      },
      { session }
    );

    await session.commitTransaction();

    return res.status(200).json({
      success: true,
      message: "Workspace deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  } finally {
    session.endSession();
  }
};