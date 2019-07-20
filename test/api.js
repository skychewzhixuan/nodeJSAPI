process.env.NODE_ENV = "test"

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');
chai.use(chaiHttp);
const should = chai.should();

describe('Test Homepage', () => {
    it('Homepage status', (done) => {
        chai.request(app)
            .get('/')
            .end((error, res) => {
                res.should.have.status(404);
                done();
            });
    });
    describe('Register New Students', () => {
        it('should add new students', (done) => {
            const body = {
                "teacher": "teachersky@gmail.com",
                "students":
                    [
                        "studentagnes@gmail.com",
                        "studentmiches@gmail.com"
                    ]
            };

            chai.request(app)
                .post('/api/register')
                .send(body)
                .end((error, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
        it('No such teacher exist', (done) => {
            const body = {
                "teacher": "nosuchteacher@gmail.com",
                "students":
                    [
                        "studentagnes@gmail.com",
                        "studentmiches@gmail.com"
                    ]
            };
            chai.request(app)
                .post('/api/register')
                .send(body)
                .end((error, res) => {
                    res.should.have.status(400);
                    done();
                });
        })
    });

    describe('Find Common Students', () => {
        it('Find using 1 teacher', (done) => {
            chai.request(app)
                .get('/api/commonstudents?teacher=teachersky%40gmail.com')
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('Find using multi teachers', (done) => {
            chai.request(app)
                .get('/api/commonstudents?teacher=teachersky%40gmail.com&teacher=teachergwen%40gmail.com')
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('No common student', (done) => {
            chai.request(app)
                .get('/api/commonstudents?teacher=teachersky%40gmail.com&teacher=teachertony%40gmail.com')
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('Suspend Student', () => {
        it('Suspend successfully', (done) => {
            const body = {
               "student": "studentagnes@gmail.com"
            };

            chai.request(app)
                .post('/api/suspend')
                .send(body)
                .end((error, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
        it('No such student to suspend', (done) => {
            const body = {
                "student": "nosuchstudent@gmail.com"
            };
            chai.request(app)
                .post('/api/suspend')
                .send(body)
                .end((error, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('Retrieve Recipients', () => {
        it('Notification with @mentioned', (done) => {
            const body = {
                "teacher":  "teachersky@gmail.com",
                "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
            }
            chai.request(app)
                .post('/api/retrievefornotifications')
                .send(body)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('Notification without @mentioned', (done) => {
            const body = {
                "teacher":  "teachersky@gmail.com",
                "notification": "Hello students!"
            }
            chai.request(app)
                .post('/api/retrievefornotifications')
                .send(body)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('No recipient', (done) => {
            const body = {
                "teacher":  "nosuchteacher@gmail.com",
                "notification": "Hello students!"
            }
            chai.request(app)
                .post('/api/retrievefornotifications')
                .send(body)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });



});

