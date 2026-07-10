// GET /api/users - Retrieve all users
router.get('/api/users', async (req, res) => {
  try {
    if (!req.query) {
      return res.status(400).json({ error: 'Invalid request' })
    }
    const users = await User.find({})
    return res.status(200).json({
      success: true,
      data: users,
      message: 'Users retrieved successfully'
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})
