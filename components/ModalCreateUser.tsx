import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import { useDataContext } from "../context/DataContext";
import { LockIcon, MailIcon } from "./icons";

export default function ModalCreateUser() {
    const { isOpenCreate, onOpenChangeModalCreate } = useDataContext();

    // Estados para todos los campos
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [dni, setDni] = useState("");
    const [placaAuto, setPlacaAuto] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [rutaSelected, setRutaSelected] = useState("ILO RUTA MIRAMAR");
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [errors, setErrors] = useState<any>({});
    const { registerUser } = useDataContext()
    const [loading, setloading] = useState(false)
    // Validación de los campos
    const validateFields = () => {

        const newErrors: any = {

        };

        if (!/^\d{8}$/.test(dni)) {
            newErrors.dni = "El DNI debe tener 8 dígitos y solo números.";
        }

        if (!/^\d{9}$/.test(telefono)) {
            newErrors.telefono = "El teléfono debe tener 9 dígitos y solo números.";
        }

        if (!correoElectronico.endsWith("@gmail.com")) {
            newErrors.correoElectronico = "El correo debe ser una cuenta de Gmail.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Función para manejar el registro
    const handleRegister = async () => {


        const userData = {
            username,
            password,
            nombres,
            apellidos,
            dni,
            placa_auto: placaAuto,
            correo_electronico: correoElectronico,
            telefono,
            direccion,
            ruta_selected: rutaSelected,
            voice_enabled: voiceEnabled,
        };
        console.log(userData)
        setloading(true)
        await registerUser(userData)
        setloading(false)
    };

    return (
        <Modal
            isOpen={isOpenCreate}
            onOpenChange={onOpenChangeModalCreate}
            placement="top-center"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-lg">
                            Registrar un nuevo conductor
                        </ModalHeader>
                        <ModalBody>
                            <p className="font-bold">Credenciales del nuevo conductor</p>
                            <Input
                                autoFocus
                                endContent={
                                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Email"
                                placeholder="Ingrese su email"
                                variant="bordered"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Input
                                endContent={
                                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Password"
                                placeholder="Ingrese su contraseña"
                                type="password"
                                variant="bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="font-bold">Información del conductor</p>
                            <div className="flex gap-10">
                                <div className="flex flex-col gap-3">
                                    <Input
                                        label="Nombres"
                                        placeholder="Ingrese los nombres"
                                        variant="bordered"
                                        value={nombres}
                                        onChange={(e) => setNombres(e.target.value)}
                                    />
                                    <Input
                                        label="Apellidos"
                                        placeholder="Ingrese los apellidos"
                                        variant="bordered"
                                        value={apellidos}
                                        onChange={(e) => setApellidos(e.target.value)}
                                    />
                                    <Input
                                        label="DNI"
                                        placeholder="Ingrese el DNI"
                                        variant="bordered"
                                        value={dni}
                                        onChange={(e) => setDni(e.target.value)}
                                        errorMessage={errors.dni}
                                    />
                                    <Input
                                        label="Placa del Auto"
                                        placeholder="Ingrese la placa del auto"
                                        variant="bordered"
                                        value={placaAuto}
                                        onChange={(e) => setPlacaAuto(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Input
                                        label="Correo Electrónico"
                                        placeholder="Ingrese el correo electrónico"
                                        variant="bordered"
                                        value={correoElectronico}
                                        onChange={(e) => setCorreoElectronico(e.target.value)}
                                        errorMessage={errors.correoElectronico}
                                    />
                                    <Input
                                        label="Teléfono"
                                        placeholder="Ingrese el teléfono"
                                        variant="bordered"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        errorMessage={errors.telefono}
                                    />
                                    <Input
                                        label="Dirección"
                                        placeholder="Ingrese la dirección"
                                        variant="bordered"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                    />
                                    <Dropdown>
                                        <DropdownTrigger>

                                            <Button color="secondary" style={{ height: 50 }} >
                                                {rutaSelected}
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu

                                            aria-label="Seleccionar Ruta"
                                            onAction={(key: any) => setRutaSelected(key)}
                                        >
                                            <DropdownItem key="ILO RUTA MIRAMAR">ILO RUTA MIRAMAR</DropdownItem>
                                            <DropdownItem key="ILO RUTA CIUDAD NUEVA">ILO RUTA CIUDAD NUEVA</DropdownItem>
                                            <DropdownItem key="AREQUIPA RUTA AVITAMIENTO">AREQUIPA RUTA AVITAMIENTO</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button isLoading={loading} disabled={loading} color="primary" onPress={handleRegister}>
                                Registrar Conductor
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
