package net.youssfi.demoensetstudents.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.youssfi.demoensetstudents.entities.Payment;
import net.youssfi.demoensetstudents.entities.PaymentType;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDto {
    private double amount;
    private PaymentType type;
    private LocalDate date;
    private String studentCode;
}
