package com.asd.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asd.DTO.MessageDto;
import com.asd.DTO.MessageWriteRequestDto;
import com.asd.model.Message;
import com.asd.model.User;
import com.asd.service.MessageService;
import com.asd.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board/messages")
public class MessageController {

    private final MessageService messageService;
    private final UserService userService;
    private Logger logger = LoggerFactory.getLogger(MessageController.class);

    //쪽지 작성
    @PostMapping
    public Map<String, String> writeMessage(HttpServletRequest request, @RequestBody MessageWriteRequestDto dto) {
    	User sender = userService.findUser(request); //보낸 유저 정보 추출
        User receiver = userService.findByNickname(dto.getReceive()); //받을 유저 정보 추출
        Message message = new Message(); //쪽지 정보 삽입
        message.setTitle(dto.getTitle());
        message.setContent(dto.getContent());
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setDeletedByReceiver(false);
        message.setDeletedBySender(false);
        
        messageService.wirteMessage(message);
        
        Map<String, String> response = new HashMap<>();
		response.put("check", "true");
		logger.info("[writeMessage] {} 사용자가 {} 사용자에게 발신.", sender.getId(), receiver.getId());
    	return response;
    }

    //받은 쪽지함 조회
    @GetMapping("/received")
    public List<MessageDto> getReceivedMessage(HttpServletRequest request) {
    	User user = userService.findUser(request); //유저 정보 추출

        return messageService.receivedMessages(user);
    }

    //보낸 쪽지함 조회
    @GetMapping("/sent")
    public List<MessageDto> getSentMessage(HttpServletRequest request) {
    	User user = userService.findUser(request); //유저 정보 추출

        return messageService.sentMessages(user);
    }

    //받은 쪽지 삭제
    @DeleteMapping("/received/{message_id}")
    public Map<String, String> deleteReceivedMessage(HttpServletRequest request, @PathVariable String message_id) {
    	User user = userService.findUser(request); //유저 정보 추출
    	messageService.deleteMessageByReceiver(Long.parseLong(message_id), user);
    	
    	Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
    }
    
    //보낸 쪽지 삭제
    @DeleteMapping("/sent/{message_id}")
    public Map<String, String> deleteSentMessage(HttpServletRequest request, @PathVariable String message_id) {
    	User user = userService.findUser(request); //유저 정보 추출
    	messageService.deleteMessageBySender(Long.parseLong(message_id), user);

    	Map<String, String> response = new HashMap<>();
		response.put("check", "true");
    	return response;
    }
}