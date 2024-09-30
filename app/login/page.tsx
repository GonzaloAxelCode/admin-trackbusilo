
"use client"
import { EyeFilledIcon, EyeSlashFilledIcon } from '@/components/icons';
import handleLogin from '@/services/login';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await handleLogin({ username, password });
      if (!response) {
        setErrorLogin("Datos incorrectos.Contacta con el administrador.")
      } else {

        setErrorLogin(null)
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="font-[sans-serif]">
      <div className=" flex flex-col items-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">

          <Card className='px-6 py-10 max-w-sm'>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start justify-center flex text-2xl">
              <img width={50} height={50} src="https://res.cloudinary.com/ddksrkond/image/upload/v1724549272/trackingapp/u6jqxxumfd8njqg2hgdt.png" alt="" />
              <p>Track</p>
              <p className="font-bold ">BusIlo</p>
            </CardHeader>

            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-4 w-full">



                <div className="w-full relative flex items-center">

                  <Input
                    isClearable
                    name="username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    label="Username"
                    variant="bordered"
                    placeholder="Escriba su username asignado"
                    defaultValue=""
                    onClear={() => console.log("input cleared")}
                    className="w-full"
                  />
                </div>

                <div>

                  <div className="relative flex items-center">
                    <Input
                      label="Contraseña"
                      variant="bordered"
                      name='password'
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Escriba su contraseña"
                      endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                          {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                      className="w-full"
                    />

                  </div>
                  <p className='text-xs mt-2 text-red-500 ml-1'>{errorLogin}</p>
                </div>

                <div className="!mt-8">

                  <Button onClick={() => setErrorLogin(null)} type="submit" isDisabled={isLoading} radius="full" className='w-full' style={{ paddingLeft: 22, paddingRight: 22, background: "black", color: "white" }} isLoading={isLoading}>
                    Entrar como administrador
                  </Button>
                </div>

              </form>
            </CardBody>
          </Card>


          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img
              src="https://res.cloudinary.com/ddksrkond/image/upload/v1724550724/trackingapp/kkqk9m5v0et9brawtf99.png"
              className="w-full h-full max-md:w-4/5 mx-auto block object-contain"
              alt="Dining Experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
