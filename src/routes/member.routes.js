const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');

const {addMember,getMembers,updateMemberRole,removeMember} = require('../controllers/member.controller');

router.use(protect);


router.post("/workspaces/:id/members", addMember);
router.get("/workspaces/:id/members", getMembers);
router.patch("/members/:memberId/role", updateMemberRole);
router.delete("/members/:memberId", removeMember);

module.exports = router;