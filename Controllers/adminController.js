// Middleware for checking if admin exists and has correct permissions
function checkAdmin(req, res, next) {
    const adminId = req.params.id;
    const loggedInAdminId = req.user.id;
  
    Admin.findById(adminId, (err, admin) => {
      if (err) {
        return next(new Error('Internal Server Error'));
      }
      if (!admin) {
        return res.status(404).send('Admin not found');
      }
      if (admin._id.toString() !== loggedInAdminId && !admin.isAdmin) {
        return res.status(403).send('Unauthorized');
      }
  
      // If usere has permissions and exists move on 
      next();
    });
  }
  
  exports.update = [checkAdmin, (req, res, next) => {
    const adminId = req.params.id;
    const updatedAdmin = {
      fullName: req.body.fullName,
      email: req.body.email,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      isAdmin: req.body.isAdmin,
      username: req.body.username,
      password: req.body.password
    };
  
    Admin.update(adminId, updatedAdmin, (err, numReplaced) => {
      if (err) {
        return next(new Error('Internal Server Error'));
      }
      if (numReplaced === 0) {
        return res.status(404).send('Admin not found');
      }
      
      res.redirect('/admin');
    });
  }];
  
  exports.delete = [checkAdmin, (req, res, next) => {
    const adminId = req.params.id;
  
    Admin.delete(adminId, (err, numRemoved) => {
      if (err) {
        return next(new Error('Internal Server Error'));
      }
      if (numRemoved === 0) {
        return res.status(404).send('Admin not found');
      }
  
      res.redirect('/admin');
    });
  }];
  