# fwk=Auth0
# lipo -create ./x86_64/$fwk.framework/$fwk ./device/$fwk.framework/$fwk -output ./$fwk
# mv $fwk ./device/$fwk.framework/$fwk

# fwk=JWTDecode
# lipo -create ./x86_64/$fwk.framework/$fwk ./device/$fwk.framework/$fwk -output ./$fwk
# mv $fwk ./device/$fwk.framework/$fwk

# fwk=KeychainAccess
# lipo -create ./x86_64/$fwk.framework/$fwk ./device/$fwk.framework/$fwk -output ./$fwk
# mv $fwk ./device/$fwk.framework/$fwk

# fwk=ReactiveCocoa
# lipo -create ./x86_64/$fwk.framework/$fwk ./device/$fwk.framework/$fwk -output ./$fwk
# mv $fwk ./device/$fwk.framework/$fwk

# fwk=ReactiveFeedback
# lipo -create ./x86_64/$fwk.framework/$fwk ./device/$fwk.framework/$fwk -output ./$fwk
# mv $fwk ./device/$fwk.framework/$fwk

# fwk=ReactiveSwift
# lipo -create ./x86_64/$fwk.framework/$fwk ./device/$fwk.framework/$fwk -output ./$fwk
# mv $fwk ./device/$fwk.framework/$fwk

# fwk=Result
# lipo -create ./x86_64/$fwk.framework/$fwk ./device/$fwk.framework/$fwk -output ./$fwk
# mv $fwk ./device/$fwk.framework/$fwk

# fwk=SimpleKeychain
# lipo -create ./x86_64/$fwk.framework/$fwk ./device/$fwk.framework/$fwk -output ./$fwk
# mv $fwk ./device/$fwk.framework/$fwk


fwk=UtilityKit
lipo -create ./x86_64/$fwk.framework/$fwk ./device/$fwk.framework/$fwk -output ./$fwk
mv $fwk ./device/$fwk.framework/$fwk

fwk=Swinject
lipo -create ./x86_64/$fwk.framework/$fwk ./device/$fwk.framework/$fwk -output ./$fwk
mv $fwk ./device/$fwk.framework/$fwk

fwk=PromiseKit
lipo -create ./x86_64/$fwk.framework/$fwk ./device/$fwk.framework/$fwk -output ./$fwk
mv $fwk ./device/$fwk.framework/$fwk

fwk=Alamofire
lipo -create ./x86_64/$fwk.framework/$fwk ./device/$fwk.framework/$fwk -output ./$fwk
mv $fwk ./device/$fwk.framework/$fwk