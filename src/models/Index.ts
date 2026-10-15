// Punto único de entrada a los modelos.
// Importá siempre desde acá: `import { Book, Author } from "../models/index.js"`.
// Así las relaciones quedan definidas antes de usarlas.

import { Adventurer } from "./Adventurers.ts";
import { Asigned } from "./Asigned.ts";
import { Missions } from "./Missions.ts";
import { User } from "./Users.ts";
import { Gremios } from "./Gremios.ts";




// Relaciones
// ──────────
// Un autor tiene muchos libros.    Author 1 ──< N Book
// Un libro tiene muchos préstamos. Book   1 ──< N Loan

// onDelete: "RESTRICT" → la base NO deja borrar un autor que tiene libros,
// ni un libro que tiene préstamos. Si lo intentás, Sequelize tira un error.


User.hasOne(Adventurer, { foreignKey: "user_id", as: "adventurer", onDelete: "RESTRICT" });
Adventurer.belongsTo(User, { foreignKey: "user_id", as: "user" });

Missions.hasMany(Asigned, { foreignKey: "missions_id", as: "asigneds", onDelete: "RESTRICT" });
Asigned.belongsTo(Missions, { foreignKey: "missions_id", as: "mission" });

Adventurer.hasMany(Asigned, { foreignKey: "adventurer_id", as: "asigneds", onDelete: "RESTRICT" });
Asigned.belongsTo(Adventurer, { foreignKey: "adventurer_id", as: "adventurer" });

Gremios.hasMany(Missions, { foreignKey: "gremio_id", as: "missions", onDelete: "RESTRICT" });
Missions.belongsTo(Gremios, { foreignKey: "gremio_id", as: "gremio" });









// Book.hasMany(Loan, { foreignKey: "book_id", as: "loans", onDelete: "RESTRICT" });
// Loan.belongsTo(Book, { foreignKey: "book_id", as: "book", onDelete: "RESTRICT" });

export { Adventurer,Asigned,Gremios,Missions,User };
