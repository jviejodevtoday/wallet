import { useForm } from "react-hook-form";
import { ethers, SigningKey } from 'ethers'
import { ec as EllipticCurve } from "elliptic";


export function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    const wallet = ethers.Wallet.createRandom()
    const json = await wallet.encrypt(data.password
    )
    console.log(json)
    window.localStorage.setItem("wallet", json)
  }



  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>


      <div className="mb-3 row">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-10">
          <input type="password" {...register("password", { required: true })} className="form-control"
            id="inputPassword" />
        </div>
      </div>
      {errors.exampleRequired && <span>This field is required</span>}
      <div className="col-auto">
        <button type="submit" className="btn btn-primary mb-3">Create Wallet</button>
      </div>
    </form>
  );
}