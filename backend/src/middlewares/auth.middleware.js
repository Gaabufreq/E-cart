import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';

// Authentication Check (JWT Verify)
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided."
    });
  }

  const parts = authHeader.trim().split(/\s+/);
  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
    return res.status(401).json({
      success: false,
      message: "Access denied. Token format must be 'Bearer <token>'"
    });
  }

  const token = parts[1]; // Correct extraction from parts
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Token missing."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user payload ({ id, role }) to request
    next();
  } catch (error) {
    return next(new AppError(`Invalid or expired token: ${error.message}`, 401));
  }
};

// Authorization Check (Role Based Access Control)
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden. You do not have permission to perform this action."
      });
    }
    next();
  };
};