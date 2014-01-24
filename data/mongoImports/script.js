conn = new Mongo();
db = conn.getDB("mean-dev");
db.talks.remove();
db.users.remove();