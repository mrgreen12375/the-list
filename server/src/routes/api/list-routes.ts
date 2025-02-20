import express from 'express';
import type { Request, Response } from 'express';
import { User, List } from '../../models/index.js';

 const router = express.Router();

//  GET /works - Get all Works
router.get('/', async (_req: Request, res: Response) => {
  try {
    const list = await List.findAll({
      include: [
        {
          model: User,
          as: 'assignedUser', // This should match the alias defined in the association
          attributes: ['username'], //Include only the volunteerName attribute
        },
      ],
    });
    res.json(list);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

// GET /works/:id - Get work by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const list = await List.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignedUser', // This should match the alias defined in the association
          attributes: ['username'], //Include only the volunteerName attribute
        },
      ],
    });
    if(list) {
      res.json(list);
    } else {
      res.status(404).json({
        message: 'Work not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

// POST /works - Create new work
router.post('/', async (req: Request, res: Response) => {
  const { name, assignedUserId } = req.body;
  try {
    const newList = await List.create({
      name, assignedUserId
    });
    res.status(201).json(newList);
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
});

// PUT /works/:id - Update work by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, assignedUserId } = req.body;
  try {
    const list = await List.findByPk(id);
    if(list) {
      list.name = name;
      list.assignedUserId = assignedUserId;
      await list.save();
      res.json(list);
    } else {
      res.status(404).json({
        message: 'list not found'
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
});

// DELETE /works/:id - Delete work by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const list = await List.findByPk(id);
    if(list) {
      await list.destroy();
      res.json({ message: 'Work deleted' });
    } else {
      res.status(404).json({
        message: 'Work not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

export { router as listRouter };