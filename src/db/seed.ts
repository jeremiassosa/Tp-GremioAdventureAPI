// Crea las tablas desde cero y carga datos de ejemplo.
// Correr con: npm run seed
// ⚠️ Borra todo lo que hubiera en las tablas de la base `GremioApi`.

import bcrypt from "bcryptjs";
import { sequelize } from "./connection.js";
import "../models/Index.ts"; 
import { User } from "../models/Users.ts";
import { Gremios } from "../models/Gremios.js";
import { Adventurer } from "../models/Adventurers.js";
import { Missions } from "../models/Missions.js";
import { Asigned } from "../models/Asigned.js";

async function seed() {
    await sequelize.sync({ force: true });

    const adminPasswordHash = await bcrypt.hash("admin123", 10);
    const userPasswordHash = await bcrypt.hash("user123", 10);

  // 1. USUARIOS
  const [admin, user1, user2, user3] = await User.bulkCreate([
    { email: "admin@gremio.com", passwordHash: adminPasswordHash, role: "admin" },
    { email: "Jere@gremio.com", passwordHash: userPasswordHash },
    { email: "Tobi@gremio.com", passwordHash: userPasswordHash },
    { email: "Gonza@gremio.com", passwordHash: userPasswordHash },
  ]);

  // 2. GREMIOS
  const [guerreros, magos] = await Gremios.bulkCreate([
    { name: "Gremio de Guerreros", description: "Misiones de combate y escolta" },
    { name: "Gremio de Magos", description: "Misiones de investigación y hechicería" },
  ]);

  // 3. AVENTUREROS (uno por usuario, user_id es 1 a 1)
  const [Jere, Tobi, Gonza] = await Adventurer.bulkCreate([
    { name: "Jere", level: 5, user_id: user1.id },
    { name: "Tobi", level: 8, user_id: user2.id },
    { name: "Gonza", level: 3, user_id: user3.id },
  ]);

  // 4. MISIONES
  const [dragon, biblioteca, escolta] = await Missions.bulkCreate([
  { title: "Cazar al dragón", objetive: "Derrotar al dragón de la montaña", level: 8, gremio_id: guerreros.id, status: true },
  { title: "Explorar la biblioteca prohibida", objetive: "Recuperar el grimorio perdido", level: 3, gremio_id: magos.id, status: true },
  { title: "Escoltar la caravana", objetive: "Llevar la caravana sana y salva a la ciudad", level: 5, gremio_id: guerreros.id, status: false },
]);

  // 5. ASIGNACIONES (muchos a muchos)
  // dragon     → Jere, Tobi        (una misión, varios aventureros)
  // biblioteca → Gonza, Jere
  // escolta    → Tobi
  // Jere hace dragon y biblioteca   (un aventurero, vJeres misiones)
  await Asigned.bulkCreate([
    { missions_id: dragon.id, adventurer_id: Jere.id },
    { missions_id: dragon.id, adventurer_id: Tobi.id },
    { missions_id: biblioteca.id, adventurer_id: Gonza.id },
    { missions_id: biblioteca.id, adventurer_id: Jere.id },
    { missions_id: escolta.id, adventurer_id: Tobi.id },
  ]);

  console.log("✅ Database created and loaded:");
  console.log(
    `   ${await User.count()} users, ${await Gremios.count()} gremios, ${await Adventurer.count()} adventurers, ` +
    `${await Missions.count()} missions, ${await Asigned.count()} asigned`
  );
  await sequelize.close();
}

seed().catch((error) => {
  console.error("❌ Error loading the database:", error);
  process.exit(1);
});