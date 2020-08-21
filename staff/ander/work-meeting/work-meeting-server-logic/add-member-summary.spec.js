require('dotenv').config();
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { random } = Math;
const addMember = require('./add-member-summary')
const { errors: { DuplicityError, UnexistenceError } } = require('work-meeting-commons')
const { mongoose, models: { User, Summary,Meeting , WorkGroup} } = require('work-meeting-data')
const { expect } = require('chai')
const bcrypt = require('bcryptjs');



describe('createSummary', () => {
    //user-oriented variables
    let name, surname, email, password, encryptedPaswword, userId;

    //workgroup-oriented variables
    let workGroupName, workGroupId

    //summary-oriented variables

    let title, content, summaryId;

    //meeting-oriented variables

    let _title, _content, meetingId;
    before(async () => {
        await mongoose.connect(MONGODB_URL)
        await Promise.all([User.deleteMany(), Summary.deleteMany(), Meeting.deleteMany(), WorkGroup.deleteMany()])

    })
    beforeEach(async () => {
        debugger
        //user-oriented
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        encryptedPaswword = await bcrypt.hash(password, 10)

        //meeting-oriented
        _title = `title-${random()}`
        _content = `content-${random()}`

        //summary-oriented
        title = `sumTitle-${random()}`
        content = `sumContent-${random()}`


        //workGroup
        workGroupName = `name-${random()}`


        const user = await User.create({ name, surname, email, password: encryptedPaswword });
        userId = user.id.toString();

        const workGroup = await WorkGroup.create({name: workGroupName, creator: userId})
        workGroupId = workGroup.id.toString()

        const meeting = await Meeting.create({ title: _title, content: _content, host: userId });
        meetingId = meeting.id.toString();
        const summary= await Summary.create({title, content, meeting: meetingId, workGroup: workGroupId})
        summaryId = summary.id.toString()
    })
    describe('asynchronous paths', () => {
        it('should succed to create a summary with a valid data', async () => {
            debugger
            const result = await addMember(userId, summaryId)
            expect(result).to.be.undefined
            const [user, summary] = await Promise.all([User.findById(userId).lean(),
            Summary.findOne({ title, content }).lean()]);

            expect(user.summaries).to.be.instanceOf(Array)
            expect(user.summaries.length).to.equal(1)
            expect(user.summaries[0].toString()).to.equal(summaryId)
            

            expect(summary).to.exist
            expect(summary.constructor.name).to.equal('Object')
            expect(summary.title).to.equal(title)
            expect(summary.content).to.equal(content)
            expect(summary.meeting.toString()).to.equal(meetingId)
            expect(summary.members[0].toString()).to.equal(userId)


        })

        it('should fail to add member if member already exist in summary members', async () => {
            await Summary.findByIdAndUpdate(summaryId, { $addToSet: { members: userId } })
            try {
                await addMember(userId, summaryId)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal(`user with id ${userId} already added`)
            }

        });
        it('should fail to create a summary when user does not exist', async () => {
            await User.deleteMany()
            try {
                await addMember(userId, summaryId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            }
        });
        it('should fail to create a summary when workgroup does not exist', async () => {
            await Summary.deleteMany()
            try {
                await addMember(userId, summaryId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`summary with id ${summaryId} does not exist`)
            }
        });

    });

    describe('synchronous paths', () => {
        it('should fail on a non-string userId', () => {
            userId = random()
            expect(() => addMember(userId, summaryId)).to.throw(TypeError, `${userId} is not a string`);

            userId = undefined
            expect(() => addMember(userId, summaryId)).to.throw(TypeError, `${userId} is not a string`);

            userId = []
            expect(() => addMember(userId, summaryId)).to.throw(TypeError, `${userId} is not a string`);

            userId = {}
            expect(() => addMember(userId, summaryId)).to.throw(TypeError, `${userId} is not a string`);

            userId = false
            expect(() => addMember(userId, summaryId)).to.throw(TypeError, `${userId} is not a string`);

            userId = null
            expect(() => addMember(userId, summaryId)).to.throw(TypeError, `${userId} is not a string`);

            userId = ''
            expect(() => addMember(userId, summaryId)).to.throw(Error, `string is empty or blank`);

            userId = '    '
            expect(() => addMember(userId, summaryId)).to.throw(Error, `string is empty or blank`);

        });
        it('should fail on a non-string workGroupId', () => {
            summaryId = random()
            expect(() => addMember(userId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`);

            summaryId = undefined
            expect(() => addMember(userId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`);

            summaryId = []
            expect(() => addMember(userId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`);

            summaryId = {}
            expect(() => addMember(userId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`);

            summaryId = false
            expect(() => addMember(userId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`);

            summaryId = null
            expect(() => addMember(userId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`);

            summaryId = ''
            expect(() => addMember(userId, summaryId)).to.throw(Error, `string is empty or blank`);

            summaryId = '    '
            expect(() => addMember(userId, summaryId)).to.throw(Error, `string is empty or blank`);

        });

    });

    afterEach(async () => {
        await Promise.all([
            User.deleteMany(),
            Meeting.deleteMany(),
            Summary.deleteMany()
        ]);
    })

    after(async () => {
        await Promise.all([
            User.deleteMany(),
            Meeting.deleteMany(),
            Summary.deleteMany()
        ]);
        await mongoose.disconnect();
    })

});
