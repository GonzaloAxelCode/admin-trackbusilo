const columns = [
 
 
  // Columnas adicionales detectadas en el primer registro
  { name: "Id", uid: "id_user" },
    { name: "Nombres", uid: "nombres" },
    
  
  
  { name: "Username", uid: "username" },
    { name: "Estado del usuario", uid: "active_user" },
  
  
  { name: "Apellidos", uid: "apellidos" },
  { name: "Identificacion (DNI)", uid: "dni" },
  { name: "Placa Auto", uid: "placa_auto" },
  { name: "Correo Electrónico", uid: "correo_electronico" },
  { name: "Teléfono", uid: "telefono" },
  { name: "Dirección", uid: "direccion" },
  { name: "Contraseña", uid: "password" },
    { name: "Actions", uid: "actions" },
];


const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "45",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
    id_user: 1,
    active_user: 1,
    map_type: "default",
    show_notifications: 1,
    username: "conductor1",
    theme: "light",
    voice_enabled: 0,
    nombres: "Tony",
    apellidos: "Reichert",
    dni: "12345678",
    placa_auto: "ABC-123",
    correo_electronico: "tony.reichert@example.com",
    telefono: "+1 555-0100",
    direccion: "123 Main St, City, Country",
    password: "jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI="
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Tech Lead",
    team: "Development",
    status: "paused",
    age: "30",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "zoey.lang@example.com",
    id_user: 2,
    active_user: 1,
    map_type: "default",
    show_notifications: 1,
    username: "techlead",
    theme: "dark",
    voice_enabled: 1,
    nombres: "Zoey",
    apellidos: "Lang",
    dni: "87654321",
    placa_auto: "XYZ-789",
    correo_electronico: "zoey.lang@example.com",
    telefono: "+1 555-0200",
    direccion: "456 Elm St, City, Country",
    password: "kLzo827J09PaOmLSkIaXzxx/YVrHq/LNMoPLokctgJK="
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Sr. Dev",
    team: "Development",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "jane.fisher@example.com",
    id_user: 3,
    active_user: 1,
    map_type: "satellite",
    show_notifications: 0,
    username: "srdev",
    theme: "light",
    voice_enabled: 0,
    nombres: "Jane",
    apellidos: "Fisher",
    dni: "23456789",
    placa_auto: "DEF-456",
    correo_electronico: "jane.fisher@example.com",
    telefono: "+1 555-0300",
    direccion: "789 Pine St, City, Country",
    password: "lMas927K01YaOmNRmIbJzyy/ZVsIr/LOPmQNkklugKL="
  },
  {
    id: 4,
    name: "William Howard",
    role: "C.M.",
    team: "Marketing",
    status: "vacation",
    age: "34",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "william.howard@example.com",
    id_user: 4,
    active_user: 0,
    map_type: "terrain",
    show_notifications: 1,
    username: "marketingpro",
    theme: "dark",
    voice_enabled: 1,
    nombres: "William",
    apellidos: "Howard",
    dni: "34567890",
    placa_auto: "GHI-012",
    correo_electronico: "william.howard@example.com",
    telefono: "+1 555-0400",
    direccion: "101 Maple St, City, Country",
    password: "mNbp837K02CaOmOSlJcAzzy/WXsGr/QMPnRMmnltgLM="
  },
  {
    id: 5,
    name: "Kristen Cooper",
    role: "S. Manager",
    team: "Sales",
    status: "active",
    age: "31",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "kristen.cooper@example.com",
    id_user: 5,
    active_user: 1,
    map_type: "default",
    show_notifications: 1,
    username: "salesguru",
    theme: "light",
    voice_enabled: 0,
    nombres: "Kristen",
    apellidos: "Cooper",
    dni: "45678901",
    placa_auto: "JKL-345",
    correo_electronico: "kristen.cooper@example.com",
    telefono: "+1 555-0500",
    direccion: "202 Oak St, City, Country",
    password: "oObp837K03QaOmPTmJdBzzz/VYsFr/RNQoSMoolugLN="
  }
  // Add more users as needed following this pattern
];

export { columns, statusOptions, users };




