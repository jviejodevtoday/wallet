import { useForm } from "react-hook-form";
import { ec as EC } from "elliptic"
import { util as keyUtil, getResolver } from "@cef-ebsi/key-did-resolver";
import { Resolver } from "did-resolver";
import { useState } from "react";




export function Login() {
  const [wallet, setWallet] = useState(null)

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    const ec = new EC("p256")
    
    const key = ec.genKeyPair();
    
    var signature = ec.sign("texto a firmar ", key);
    console.log(signature, signature.recoveryParam)
    console.log(signature.recoveryParam)
    console.log(ec.verify("texto", signature, key))

    console.log(ec.recoverPubKey("texto", signature, signature.recoveryParam).x.toString(16))
    console.log(ec.recoverPubKey("texto", signature, signature.recoveryParam).y.toString(16))

    const pubPoint = key.getPublic();
    
    const sk = key.getPrivate();

    const x = pubPoint.getX().toString(16);
    const y = pubPoint.getY().toString(16);

    const jwk = {
      kty: "EC",
      crv: "P-256",
      x: x,
      y: y,
    };
    const jwkPrivate = {
      kty: "EC",
      crv: "P-256",
      x: x,
      y: y,
      d: sk.toString(16)
    };
    const naturalPersonDid = keyUtil.createDid(jwk);
    
    const keyResolver = getResolver();
    const didResolver = new Resolver(keyResolver);

    const r = await didResolver
      .resolve(
        naturalPersonDid
      )
    
    setWallet({
      did: naturalPersonDid,
      private: jwkPrivate,
      didDocument: r
    })
    window.localStorage.setItem(`${wallet}:did:key`, JSON.stringify(naturalPersonDid))
    window.localStorage.setItem(`${wallet}:jwkPrivate`, JSON.stringify(jwkPrivate))
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 row">
        <label htmlFor="inputWallet" className="col-sm-2 col-form-label">Nombre</label>
        <div className="col-sm-10">
          <input type="wallet" {...register("wallet", { required: true })} className="form-control"
            id="inputWallet" />
          {errors.wallet && <span>This field is required</span>}
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="inputWallet" className="col-sm-2 col-form-label mb-3">Password</label>
        <div className="col-sm-10">
          <input type="password" {...register("password", { required: true })} className="form-control"
            id="inputPassword" />
          {errors.password && <span>This field is required</span>}
        </div>
      </div>

      <div className="col-auto">
        <button type="submit" className="btn btn-primary mb-3">Create Wallet</button>
      </div>
      {wallet &&
        <div>
          <xmp>{JSON.stringify(wallet.private, null, 4)}</xmp>
          <xmp>{wallet.did}</xmp>
          <pre>didDocument = {JSON.stringify(wallet.didDocument, null, 4)}</pre>
        </div>
      }
    </form>
  );
}