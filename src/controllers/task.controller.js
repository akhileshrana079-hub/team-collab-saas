const Task = require("../models/Task");
const Project = require("../models/Project");
const checkWorkspacePermission = require("../utils/checkWorkspacePermission");

exports.createTask = async (req, res) => {
  try {

    const { projectId } = req.params;
    const {
      title,
      description,
      priority,
      dueDate
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

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
      ["OWNER", "ADMIN", "MANAGER", "MEMBER"]
    );

    if (!permission.success) {
      return res.status(permission.status).json({
        success: false,
        message: permission.message,
      });
    }

    const task = await Task.create({
      project: projectId,
      title,
      description,
      priority,
      dueDate,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};


exports.getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const {
      page = 1,
      limit = 10,
      status,
      priority,
      search,
      sort = "-createdAt",
    } = req.query;

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
      ["OWNER", "ADMIN", "MANAGER", "MEMBER"]
    );

    if (!permission.success) {
      return res.status(permission.status).json({
        success: false,
        message: permission.message,
      });
    }

    const filter = {
      project: projectId,
    };

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    const tasks = await Task.find(filter)
      .populate("assignee", "name email")
      .populate("createdBy", "name")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Task.countDocuments(filter);

    return res.status(200).json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalTasks: total,
      count: tasks.length,
      data: tasks,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};


exports.getTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId)
      .populate("createdBy", "name email avatar")
      .populate("assignee", "name email avatar")
      .populate({
        path: "project",
        select: "name workspace",
      });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const permission = await checkWorkspacePermission(
      task.project.workspace,
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
      data: task,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

exports.updateTask = async (req, res) => {
  try {

    const { taskId } = req.params;

    const task = await Task.findById(taskId)
      .populate({
        path: "project",
        select: "workspace",
      });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const permission = await checkWorkspacePermission(
      task.project.workspace,
      req.user._id,
      ["OWNER", "ADMIN", "MANAGER", "MEMBER"]
    );

    if (!permission.success) {
      return res.status(permission.status).json({
        success: false,
        message: permission.message,
      });
    }

    const {
      title,
      description,
      priority,
      dueDate,
    } = req.body;

    if (title !== undefined) task.title = title;

    if (description !== undefined)
      task.description = description;

    if (priority !== undefined)
      task.priority = priority;

    if (dueDate !== undefined)
      task.dueDate = dueDate;

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId).populate({
      path: "project",
      select: "workspace",
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const permission = await checkWorkspacePermission(
      task.project.workspace,
      req.user._id,
      ["OWNER", "ADMIN", "MANAGER"]
    );

    if (!permission.success) {
      return res.status(permission.status).json({
        success: false,
        message: permission.message,
      });
    }

    await task.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "TODO",
      "IN_PROGRESS",
      "IN_REVIEW",
      "DONE",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task status",
      });
    }

    const task = await Task.findById(taskId).populate({
      path: "project",
      select: "workspace",
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const permission = await checkWorkspacePermission(
      task.project.workspace,
      req.user._id,
      ["OWNER", "ADMIN", "MANAGER", "MEMBER"]
    );

    if (!permission.success) {
      return res.status(permission.status).json({
        success: false,
        message: permission.message,
      });
    }

    task.status = status;

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: task,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.assignTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const task = await Task.findById(taskId).populate({
      path: "project",
      select: "workspace",
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const permission = await checkWorkspacePermission(
      task.project.workspace,
      req.user._id,
      ["OWNER", "ADMIN", "MANAGER"]
    );

    if (!permission.success) {
      return res.status(permission.status).json({
        success: false,
        message: permission.message,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const member = await WorkspaceMember.findOne({
      workspace: task.project.workspace,
      user: userId,
    });

    if (!member) {
      return res.status(400).json({
        success: false,
        message: "User is not a member of this workspace",
      });
    }

    task.assignee = userId;

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task assigned successfully",
      data: task,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};