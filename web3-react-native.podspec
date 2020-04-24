require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "web3-react-native"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  web3-react-native
                   DESC
  s.homepage     = "https://github.com/cawfree/web3-react-native"
  # brief license entry:
  s.license      = "MIT"
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "Alex Thomas (@cawfree) <hello@cawfree.com>" => "hello@cawfree.com" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/cawfree/web3-react-native.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true

  s.dependency "React"

  # TODO: We need some way to import web3swift as a header without
  #       triggering compilation errors. As a workaround, we
  #       manually define these in the app's Podspec.

  s.dependency 'secp256k1.c', '0.1.2'
  s.dependency 'web3swift', '2.2.1'

end

