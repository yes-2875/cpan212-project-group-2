import { randomUUID } from 'node:crypto';
import { reviews } from '../data/store.js';

// GET /api/reviews
export function getAllReviews(req, res) {
    res.status(200).json(reviews);
}

// GET /api/reviews/:id
export function getReviewById(req, res) {
    const review = reviews.find(
        (item) => item._id === req.params.id
    );

    if (!review) {
        return res.status(404).json({
            error: { message: 'Review not found' }
        });
    }

    res.status(200).json(review);
}

// POST /api/reviews
export function createReview(req, res) {
    const newReview = {
        _id: randomUUID(),
        userId: 'sample-user',
        ...req.body
    };

    reviews.push(newReview);

    res.status(201).json(newReview);
}

// PUT /api/reviews/:id
export function updateReview(req, res) {
    const index = reviews.findIndex(
        (item) => item._id === req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            error: { message: 'Review not found' }
        });
    }

    reviews[index] = {
        ...reviews[index],
        ...req.body,
        _id: reviews[index]._id,
        userId: reviews[index].userId
    };

    res.status(200).json(reviews[index]);
}

// DELETE /api/reviews/:id
export function deleteReview(req, res) {
    const index = reviews.findIndex(
        (item) => item._id === req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            error: { message: 'Review not found' }
        });
    }

    reviews.splice(index, 1);

    res.status(204).end();
}