package io.github.cawfree.web3;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import org.web3j.crypto.Credentials;
import org.web3j.crypto.CipherException;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.Transfer;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.utils.Convert;
import org.web3j.utils.Numeric;

import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.io.FileWriter;
import java.util.UUID;
import java.util.Map;
import java.util.HashMap;
import java.math.BigDecimal;

// TODO: Remove this!
import android.util.Log;

// Heavily influenced by (thanks guys!):
// https://github.com/web3j/sample-project-gradle/blob/master/src/main/java/org/web3j/sample/Application.java
public final class Web3Module extends ReactContextBaseJavaModule {

  /* Static Declarations */
  public static final String TAG = "Web3Module";

  /** A simple utility method to print via ADB. */
  private static final void debug(final String pString) {
    Log.d(TAG, pString);
    return;
  }

  /* Member Variables. */
  private final Map<String, Credentials> mWallets;

  /** Constructor */
  public Web3Module(final ReactApplicationContext pReactApplicationContext) {
    super(pReactApplicationContext);
    // Initialize Member Variables.
    this.mWallets = new HashMap();
  }

  /** Module name when imported via NativeModules. **/
  @Override public String getName() { return "Web3"; }

  @ReactMethod
  public final void loadWallet(final ReadableMap pKeystore, final String pPassword, final Promise pPromise) {
    try {
      // XXX: Attempt to create the Wallet.
      final String       addr = this.addWallet(pKeystore, pPassword);
      final WritableMap args = Arguments.createMap();
      // XXX: Propagate useful properties back to the caller.
      args.putString("address", addr);
      // XXX: Return the allocated wallet instance to the caller.
      pPromise.resolve(args);
    }
    catch (final Exception pException) {
      pPromise.reject(pException);
    }
    return;
  }

  @ReactMethod
  public final void sendFunds(final ReadableMap pWallet, final String pUrl, final String pPassword, final String pToAddress, final String pAmount, final String pUnits, final Promise pPromise) {
    try {
      // Fetch the Credentials.
      final Credentials c = this.getWallets().get(pWallet.getString("address"));
      if (c != null) {
        // XXX: Allocate the HttpService we'll use for this transaction.
        // TODO: Does this need to be destroyed? Is it worth caching?
        final Web3j web3j = Web3j.build(new HttpService(pUrl));
        final TransactionReceipt tr = Transfer.sendFunds(
          web3j,
          c,
          pToAddress,
          new BigDecimal(pAmount),
          Convert.Unit.valueOf(pUnits)
        )
        .send();
        // Declare the callback parameters.
        final WritableMap args = Arguments.createMap();
        // Buffer the hash for the transaction.
        args.putString("transactionHash", tr.getTransactionHash());
        // Propagate the arguments to the caller.
        pPromise.resolve(args);
        return;
      }
      throw new IllegalStateException("No credentials found!");
    }
    catch (final Exception pException) {
      pPromise.reject(pException);
    }
    return;
  }

  /** Writes string contents to a designated File. **/
  private void writeFile(final File pFile, final String pContent) throws IOException {
    final FileWriter fw = new FileWriter(pFile, true);
    fw.write(pContent);
    // XXX: Ensure all of the bytes are written.
    fw.flush();
    fw.close();
  }

  /** Adds a Wallet to the in-memory map. */
  private final String addWallet(final ReadableMap pKeystore, final String pPassword) throws IOException, CipherException {
    final File f = File.createTempFile(
      UUID.randomUUID().toString(),
      "json",
      this.getReactApplicationContext().getCacheDir()
    );
    // XXX:  Write the supplied data to a temporary file.
    // TODO: Use loadJsonCredentials.
    this.writeFile(f, new JSONObject(pKeystore.toHashMap()).toString());

    // Load the Credentials.
    final Credentials c = WalletUtils.loadCredentials(pPassword, f.getAbsolutePath());
    // Delete the allocated file; it serves no purpose now.
    f.delete();
    // Fetch the Address of the Wallet.
    final String addr = c.getAddress();
    // Here we track the wallet for future reference. Any attempts to
    // re-create the same wallet will resolve to the same place in memory.
    this.getWallets().put(addr, c);
    // Return the Wallet's address.
    return addr;
  }

  private final Map<String, Credentials> getWallets() {
    return this.mWallets;
  }
  
}
