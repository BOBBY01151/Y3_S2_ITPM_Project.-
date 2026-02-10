const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config({ path: './.env' });

const seedSuperAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Super Admin
        const adminExists = await User.findOne({ email: 'superadmin@sliit.lk' });
        if (!adminExists) {
            await new User({
                name: 'Super Admin',
                email: 'superadmin@sliit.lk',
                password: 'superpassword123',
                role: 'superadmin',
                status: 'active'
            }).save();
            console.log('Super Admin created.');
        }

        // Sports Council (Council role)
        const sportsExists = await User.findOne({ email: 'sports@sliit.lk' });
        if (!sportsExists) {
            await new User({
                name: 'Sports Council',
                email: 'sports@sliit.lk',
                password: 'sportspassword123',
                role: 'council',
                department: 'Sports Council',
                status: 'active'
            }).save();
            console.log('Sports Council user created.');
        }

        // Computing Society (Community role)
        const compSocExists = await User.findOne({ email: 'compsoc@sliit.lk' });
        if (!compSocExists) {
            await new User({
                name: 'Computing Society',
                email: 'compsoc@sliit.lk',
                password: 'computingpassword123',
                role: 'community',
                department: 'Faculty of Computing',
                status: 'active'
            }).save();
            console.log('Computing Society user created.');
        }

        console.log('Seeding complete.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding Super Admin:', error);
        process.exit(1);
    }
};

seedSuperAdmin();
