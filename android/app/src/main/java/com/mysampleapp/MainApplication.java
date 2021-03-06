package com.mysampleapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.github.yamill.orientation.OrientationPackage;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.sha256lib.Sha256Package;
import com.oblador.keychain.KeychainPackage;
import com.kevinresol.react_native_default_preference.RNDefaultPreferencePackage;
import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new OrientationPackage(),
            new RNExitAppPackage(),
            new FingerprintAuthPackage(),
            new RNDeviceInfo(),
            new SnackbarPackage(),
            new Sha256Package(),
            new KeychainPackage(),
            new RNDefaultPreferencePackage(),
            new ReactNativeFingerprintScannerPackage(),
            new VectorIconsPackage(),
            new RNCameraPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
