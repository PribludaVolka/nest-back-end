import {Module} from "@nestjs/common";
import { FileService } from "./file.service";
import { CloudnianaryProvider } from "./cloudinary";

@Module({
    providers: [FileService, CloudnianaryProvider]
})

export class FileModule{}