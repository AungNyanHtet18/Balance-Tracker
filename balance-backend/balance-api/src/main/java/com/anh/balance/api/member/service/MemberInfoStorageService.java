package com.anh.balance.api.member.service;

import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class MemberInfoStorageService {

	@Value("${app.memberinfo.profile-directory}")
	private String memberInfoFolderName;
	
    public String save(String code, MultipartFile memberInfo) {

        if (memberInfo == null || memberInfo.isEmpty()) {
            return null;
        }

        try {
            var fileName = getFileName(code, memberInfo);
            var memberInfoDirectory = Path.of(memberInfoFolderName);

            if (!Files.exists(memberInfoDirectory, LinkOption.NOFOLLOW_LINKS)) {
                Files.createDirectory(memberInfoDirectory); 
            }

            var imagePath = memberInfoDirectory.resolve(Path.of(fileName));

            Files.copy(memberInfo.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);

            return fileName;

        } catch (Exception e) {
            throw new RuntimeException("Failed to save member info file", e);
        }
    }

    private String getFileName(String code, MultipartFile memberInfo) {

    	var nameCode = code.contains("@") ? code.substring(0, code.indexOf("@")) : code;
    	
        var originalName = memberInfo.getOriginalFilename();

        if (originalName == null || !originalName.contains(".")) {
            return "%s.dat".formatted(nameCode); 
        }

        var extension = originalName.substring(originalName.lastIndexOf('.') + 1);

        return "%s.%s".formatted(nameCode, extension);
    }
}
