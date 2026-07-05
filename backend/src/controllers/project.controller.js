const Project = require('../models/Project');
const checkWorkspacePermission = require('../utils/checkWorkspacePermission');
const Task = require("../models/Task");

exports.createProject = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }

    const permission = await checkWorkspacePermission(
      workspaceId,
      req.user._id,
      ["OWNER", "ADMIN", "MANAGER"]
    );

    if (!permission.success) {
      return res.status(permission.status).json({
        success: false,
        message: permission.message,
      });
    }

    const project = await Project.create({
      workspace: workspaceId,
      name,
      description,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


exports.getProjects = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const permission = await checkWorkspacePermission(
      workspaceId,
      req.user._id,
      ["OWNER", "ADMIN", "MANAGER", "MEMBER"]
    );

    if (!permission.success) {
      return res.status(permission.status).json({
        success: false,
        message: permission.message,
      });
    }

    const projects = await Project.find({
      workspace: workspaceId,
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId)
      .populate("workspace", "name")
      .populate("createdBy", "name email");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const permission = await checkWorkspacePermission(
      project.workspace._id,
      req.user._id,
      ["OWNER", "ADMIN", "MANAGER", "MEMBER"]
    );

    if (!permission.success) {
      return res.status(permission.status).json({
        success: false,
        message: permission.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const permission = await checkWorkspacePermission(
      project.workspace,
      req.user._id,
      ["OWNER", "ADMIN", "MANAGER"]
    );

    if (!permission.success) {
      return res.status(permission.status).json(permission);
    }

    const { name, description, status } = req.body;

    if (name !== undefined) project.name = name;
    if (description !== undefined) project.description = description;
    if (status !== undefined) project.status = status;

    await project.save();

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const permission = await checkWorkspacePermission(
      project.workspace,
      req.user._id,
      ["OWNER", "ADMIN"]
    );

    if (!permission.success) {
      return res.status(permission.status).json(permission);
    }

    await Task.deleteMany({
      project: projectId,
    });

    await project.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
