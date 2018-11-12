const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node Course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    // eq (equal)
    // ne (not equal)
    // gt (greater than or equal to)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    const courses = await Course
        .find({ author: 'Mosh', isPublished: true})
        // .find({price: { $gte: 10, $lte: 20}})
        // .find({price: {$in: [10, 15, 20]}})
        //Starts with Mosh
        // .find([{author: /^Mosh/}])
        // .find([{author: /Hamedani$/i}])
        // .find([{author: /.*Mosh.*/i}])
        // .or([{author: 'Mosh'}, {isPublished: true}])
        // .and([{author: 'Mosh'}, {isPublished: true}])
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({name: 1})
        .select({name: 1, tags: 1});
        // .countDocuments();
    console.log(courses);
}

async function updateCourse(id) {
   const course = await Course.findById(id);
   if (!course) return;

   course.isPublished = true;
   course.author = 'Another Author';

   const result = await course.save();
   console.log(result);
}

updateCourse('5be472e08b98a405e49119fc');